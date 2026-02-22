import { type NextRequest, NextResponse } from "next/server";

type RephraseBody = {
  text?: unknown;
  context?: unknown;
};

function simplifyFrenchText(input: string): string {
  let output = input.trim();

  const replacements: Array<[RegExp, string]> = [
    [/non conforme/gi, "pas conforme"],
    [/compromet/gi, "réduit"],
    [
      /dispositif de protection à courant différentiel-résiduel/gi,
      "différentiel",
    ],
    [/liaison équipotentielle supplémentaire/gi, "liaison équipotentielle"],
    [/résistance de dispersion de la prise de terre/gi, "résistance de terre"],
    [/détection/gi, "identification"],
    [/subordonné\(s\)/gi, "supplémentaire(s)"],
  ];

  for (const [pattern, replacement] of replacements) {
    output = output.replace(pattern, replacement);
  }

  output = output.replace(/\s+/g, " ").trim();

  if (!/[.!?]$/.test(output)) {
    output += ".";
  }

  return `En clair : ${output}`;
}

async function rephraseWithOpenAI(
  text: string,
  context: string,
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const prompt =
    "Tu es un assistant électricien RGIE. Reformule le texte en français simple, précis, sans changer le sens technique, en 1 à 2 phrases.";

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: prompt }],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Contexte: ${context}\nTexte à reformuler: ${text}`,
            },
          ],
        },
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const payload: unknown = await response.json();
  const extracted =
    typeof payload === "object" &&
    payload !== null &&
    "output_text" in payload &&
    typeof (payload as { output_text?: unknown }).output_text === "string"
      ? (payload as { output_text: string }).output_text
      : null;

  return extracted?.trim() || null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: RephraseBody;

  try {
    body = (await req.json()) as RephraseBody;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  const context =
    typeof body.context === "string" ? body.context.trim() : "general";

  if (!text) {
    return NextResponse.json(
      { error: "Le texte à reformuler est obligatoire." },
      { status: 400 },
    );
  }

  try {
    const ai = await rephraseWithOpenAI(text, context);
    if (ai) {
      return NextResponse.json(
        { rephrased: ai, provider: "openai" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { rephrased: simplifyFrenchText(text), provider: "local" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { rephrased: simplifyFrenchText(text), provider: "local" },
      { status: 200 },
    );
  }
}
