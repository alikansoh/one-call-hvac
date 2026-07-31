import { NextRequest, NextResponse } from "next/server";
import { generateInvoicePdf } from "@/lib/GenerateInvoicePdf";
import { InvoicePayload } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as InvoicePayload;

    // basic validation
    if (!body.receiver?.name || !body.items?.length) {
      return NextResponse.json(
        { error: "Receiver name and at least one item are required." },
        { status: 400 }
      );
    }

    const pdfBytes = await generateInvoicePdf(body);

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${body.invoiceNumber || "invoice"}.pdf"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate invoice." }, { status: 500 });
  }
}