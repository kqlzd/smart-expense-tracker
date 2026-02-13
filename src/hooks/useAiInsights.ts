import { useState } from "react";

export const useAIInsights = (): any => {
  const [loading, setLoading] = useState<boolean>(false);
  const [insights, setInsights] = useState<string>("");

  const generateInsights = async (expenses: any[]): Promise<void> => {
    if (expenses.length === 0) {
      setInsights(
        "Hələ xərc yoxdur. Xərc əlavə edəndən sonra AI analiz edəcək.",
      );
      return;
    }
    setLoading(true);

    try {
      const apiKey = "AIzaSyC7A97tChTr8bvuAV57_6HWkK8sg-k3YJU";

      if (!apiKey) {
        throw new Error("API key tapılmadı");
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

      const totalSpent: number = expenses.reduce(
        (sum: number, exp: any) => sum + exp.amount,
        0,
      );

      const categoryTotals: Record<string, number> = {};
      expenses.forEach((exp: any) => {
        categoryTotals[exp.category] =
          (categoryTotals[exp.category] || 0) + exp.amount;
      });

      const prompt: string = `
Mən bir xərc tracker istifadə edirəm. Mənim xərclərim haqqında analiz et və tövsiyələr ver.

Toplam xərc: ${totalSpent}₼
Xərc sayı: ${expenses.length}

Kateqoriya üzrə:
${Object.entries(categoryTotals)
  .map(
    ([cat, amount]: [string, number]) =>
      `- ${cat}: ${amount}₼ (${((amount / totalSpent) * 100).toFixed(1)}%)`,
  )
  .join("\n")}

Son xərclər:
${expenses
  .slice(0, 5)
  .map((exp: any) => `- ${exp.description} (${exp.category}): ${exp.amount}₼`)
  .join("\n")}

Zəhmət olmasa:
1. Xərc pattern-lərimi analiz et
2. Hansı kateqoriyada çox xərcləyirəm?
3. Necə qənaət edə bilərəm?
4. 2-3 konkret tövsiyə ver

Cavabı Azərbaycan dilində, qısa və aydın yaz (maksimum 200 söz).
`;

      console.log("🔍 API Request:", { url: url.split("?")[0] });

      const response: any = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      const data: any = await response.json();

      console.log("📡 API Response:", data);

      if (data.error) {
        throw new Error(`${data.error.message} (Code: ${data.error.code})`);
      }

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("AI cavab vermədi");
      }

      const text: string = data.candidates[0].content.parts[0].text;
      setInsights(text);
    } catch (error: unknown) {
      console.error("AI Error:", error);

      const errorMessage: string =
        error instanceof Error ? error.message : "Naməlum xəta";

      setInsights(`AI analiz zamanı xəta: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return { insights, loading, generateInsights };
};
