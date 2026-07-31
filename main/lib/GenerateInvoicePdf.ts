import { PDFDocument, StandardFonts, rgb, RGB } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import { InvoicePayload } from "./types";

// Brand palette pulled from the Hero component / logo:
// cool blue (#2670a8 / #134a73) + warm orange (#ff7a2e)
const BLUE: RGB = rgb(0.15, 0.44, 0.66); // #2670a8
const NAVY: RGB = rgb(0.075, 0.29, 0.451); // #134a73
const ORANGE: RGB = rgb(1, 0.478, 0.18); // #ff7a2e
const DARK: RGB = rgb(0.15, 0.15, 0.18);
const GREY: RGB = rgb(0.4, 0.4, 0.42);
const LIGHT_BG: RGB = rgb(0.94, 0.96, 0.98);
const WHITE: RGB = rgb(1, 1, 1);

function money(n: number) {
  return n.toFixed(2);
}

export async function generateInvoicePdf(data: InvoicePayload): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size, matches template proportions
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const marginX = 50;
  let y = height - 60;

  const draw = (
    text: string,
    x: number,
    yPos: number,
    opts: { size?: number; f?: typeof font; color?: RGB; align?: "left" | "right" } = {}
  ) => {
    const size = opts.size ?? 10;
    const f = opts.f ?? font;
    const color = opts.color ?? DARK;
    let drawX = x;
    if (opts.align === "right") {
      const w = f.widthOfTextAtSize(text, size);
      drawX = x - w;
    }
    page.drawText(text, { x: drawX, y: yPos, size, font: f, color });
  };

  // ---- Brand strip (top of page, blue -> orange, echoes the logo/hero) ----
  const stripHeight = 6;
  page.drawRectangle({
    x: 0,
    y: height - stripHeight,
    width: width / 2,
    height: stripHeight,
    color: NAVY,
  });
  page.drawRectangle({
    x: width / 2,
    y: height - stripHeight,
    width: width / 2,
    height: stripHeight,
    color: ORANGE,
  });

  // ---- Logo (top left) ----
  const logoSize = 80;
  let logoBottomY = height - 60 - logoSize;
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const logoBytes = await fs.readFile(logoPath);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const scaled = logoImage.scale(logoSize / Math.max(logoImage.width, logoImage.height));
    page.drawImage(logoImage, {
      x: marginX,
      y: height - 60 - scaled.height,
      width: scaled.width,
      height: scaled.height,
    });
    logoBottomY = height - 60 - scaled.height;
  } catch {
    // Logo missing or unreadable — continue without it, no need to fail invoice generation.
    logoBottomY = height - 60;
  }

  // ---- Header ----
  draw("Invoice", width - marginX, y, { size: 28, f: bold, color: BLUE, align: "right" });
  // two-tone underline accent beneath the title, matching the hero's gradient underline
  const titleWidth = bold.widthOfTextAtSize("Invoice", 28);
  const titleStartX = width - marginX - titleWidth;
  page.drawRectangle({
    x: titleStartX,
    y: y - 6,
    width: titleWidth / 2,
    height: 2,
    color: BLUE,
  });
  page.drawRectangle({
    x: titleStartX + titleWidth / 2,
    y: y - 6,
    width: titleWidth / 2,
    height: 2,
    color: ORANGE,
  });

  y -= 22;
  draw(`Invoice# ${data.invoiceNumber}`, width - marginX, y, { size: 11, f: bold, align: "right" });

  const total = data.items.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const totalVat = data.items.reduce(
    (sum, i) => sum + i.qty * i.rate * (i.vatPercent / 100),
    0
  );
  const grandTotal = total + totalVat;
  const deposit = data.deposit ?? 0;
  const balanceDue = grandTotal - deposit;

  y -= 30;
  draw("Balance Due", width - marginX, y, { size: 10, f: bold, align: "right" });
  y -= 16;
  draw(`£${money(balanceDue)}`, width - marginX, y, { size: 16, f: bold, color: ORANGE, align: "right" });

  // ---- Sender block (top left, below logo) ----
  let leftY = logoBottomY - 14;
  draw(data.sender.name, marginX, leftY, { size: 12, f: bold, color: NAVY });
  leftY -= 16;
  for (const line of data.sender.addressLines) {
    draw(line, marginX, leftY, { size: 10, color: GREY });
    leftY -= 13;
  }
  if (data.sender.phone) {
    draw(data.sender.phone, marginX, leftY, { size: 10, color: GREY });
    leftY -= 13;
  }
  if (data.sender.email) {
    draw(data.sender.email, marginX, leftY, { size: 10, color: GREY });
    leftY -= 13;
  }

  // ---- Dates block (right, below balance due) ----
  const dateY = leftY - 10;
  draw("Invoice Date :", width - marginX - 90, dateY, { size: 10, align: "right" });
  draw(data.invoiceDate, width - marginX, dateY, { size: 10, f: bold, align: "right" });
  draw("Terms :", width - marginX - 90, dateY - 15, { size: 10, align: "right" });
  draw(data.terms, width - marginX, dateY - 15, { size: 10, f: bold, align: "right" });
  draw("Due Date :", width - marginX - 90, dateY - 30, { size: 10, align: "right" });
  draw(data.dueDate, width - marginX, dateY - 30, { size: 10, f: bold, align: "right" });

  // ---- Receiver block ----
  let recY = dateY - 60;
  draw(data.receiver.name, marginX, recY, { size: 11, f: bold });
  recY -= 14;
  for (const line of data.receiver.addressLines) {
    draw(line, marginX, recY, { size: 10, color: GREY });
    recY -= 13;
  }

  // ---- Table header ----
  const tableY = Math.min(recY, dateY - 90) - 20;
  const colX = {
    num: marginX,
    desc: marginX + 25,
    qty: width - marginX - 230,
    rate: width - marginX - 175,
    vatPct: width - marginX - 110,
    vat: width - marginX - 55,
    amount: width - marginX,
  };

  page.drawRectangle({
    x: marginX,
    y: tableY - 6,
    width: width - marginX * 2,
    height: 20,
    color: NAVY,
  });
  // thin orange accent under the table header, tying it back to the brand strip
  page.drawRectangle({
    x: marginX,
    y: tableY - 8,
    width: width - marginX * 2,
    height: 2,
    color: ORANGE,
  });
  const headerTextY = tableY;
  draw("#", colX.num + 3, headerTextY, { size: 9, f: bold, color: WHITE });
  draw("Description", colX.desc, headerTextY, { size: 9, f: bold, color: WHITE });
  draw("Qty", colX.qty, headerTextY, { size: 9, f: bold, color: WHITE, align: "right" });
  draw("Rate", colX.rate, headerTextY, { size: 9, f: bold, color: WHITE, align: "right" });
  draw("VAT %", colX.vatPct, headerTextY, { size: 9, f: bold, color: WHITE, align: "right" });
  draw("VAT", colX.vat, headerTextY, { size: 9, f: bold, color: WHITE, align: "right" });
  draw("Amount", colX.amount, headerTextY, { size: 9, f: bold, color: WHITE, align: "right" });

  y = tableY - 30;

  data.items.forEach((item, idx) => {
    const amount = item.qty * item.rate;
    const vat = amount * (item.vatPercent / 100);

    // Normalize any literal newlines/extra whitespace in the source description
    // (pasted multi-line text) before wrapping — otherwise a "word" can contain
    // a newline, never break, and run straight past the Qty column.
    const words = item.description.replace(/\s+/g, " ").trim().split(" ");
    const lines: string[] = [];
    let current = "";
    // The Qty value is right-aligned against colX.qty, so it can extend well
    // to the LEFT of that point for large quantities (e.g. "1900000.00").
    // Reserve that width (plus padding) instead of a fixed 10pt gap, or a
    // big quantity will print right on top of the description text.
    const qtyText = item.qty.toFixed(2);
    const qtyWidth = font.widthOfTextAtSize(qtyText, 9);
    const maxWidth = Math.max(80, colX.qty - colX.desc - qtyWidth - 15);
    for (const w of words) {
      const test = current ? current + " " + w : w;
      if (font.widthOfTextAtSize(test, 9) > maxWidth) {
        if (current) lines.push(current);
        // Handle a single word/token that is itself wider than the column
        // (long chemical names, refrigerant codes, etc.) by hard-breaking it
        // character by character instead of letting it overflow.
        if (font.widthOfTextAtSize(w, 9) > maxWidth) {
          let chunk = "";
          for (const ch of w) {
            const testChunk = chunk + ch;
            if (font.widthOfTextAtSize(testChunk, 9) > maxWidth) {
              lines.push(chunk);
              chunk = ch;
            } else {
              chunk = testChunk;
            }
          }
          current = chunk;
        } else {
          current = w;
        }
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);

    draw(String(idx + 1), colX.num + 3, y, { size: 9 });
    lines.forEach((line, li) => {
      draw(line, colX.desc, y - li * 11, { size: 9 });
    });
    draw(qtyText, colX.qty, y, { size: 9, align: "right" });
    draw(money(item.rate), colX.rate, y, { size: 9, align: "right" });
    draw(item.vatPercent.toFixed(2), colX.vatPct, y, { size: 9, align: "right" });
    draw(money(vat), colX.vat, y, { size: 9, align: "right" });
    draw(money(amount), colX.amount, y, { size: 9, align: "right" });

    y -= Math.max(16, lines.length * 11 + 5);
  });

  page.drawLine({
    start: { x: marginX, y: y + 8 },
    end: { x: width - marginX, y: y + 8 },
    thickness: 0.5,
    color: GREY,
  });
  y -= 12;

  const totalsLine = (label: string, value: string, boldRow = false) => {
    draw(label, width - marginX - 180, y, { size: 10, f: boldRow ? bold : font, align: "right" });
    draw(value, width - marginX, y, { size: 10, f: boldRow ? bold : font, align: "right" });
    y -= 16;
  };

  totalsLine("Sub Total", money(total));
  totalsLine("Total Taxable Amount", money(total));
  if (data.vatRegistered) {
    totalsLine("Total VAT", money(totalVat));
  } else {
    totalsLine("Zero Rate (0%)", "0.00");
  }
  totalsLine("Total", `£${money(grandTotal)}`, true);

  if (deposit > 0) {
    totalsLine("Less Deposit", `-£${money(deposit)}`);
  }

  page.drawRectangle({
    x: marginX,
    y: y - 6,
    width: width - marginX * 2,
    height: 18,
    color: LIGHT_BG,
  });
  totalsLine("Balance Due", `£${money(balanceDue)}`, true);

  // ---- Footer ----
  y -= 30;
  draw(
    `Thank you for choosing ${data.sender.name}. If you have any questions regarding this invoice, feel free to contact us.`,
    marginX,
    y,
    { size: 8, color: GREY }
  );
  y -= 11;
  if (!data.vatRegistered) {
    draw(`Please note: ${data.sender.name} is not VAT registered. No VAT has been charged.`, marginX, y, {
      size: 8,
      color: GREY,
    });
  }
  if (data.notes) {
    y -= 14;
    draw(data.notes, marginX, y, { size: 8, color: GREY });
  }

  return pdfDoc.save();
}