async function summarizeText(text) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: text })
        }
    );

    const data = await response.json();

    return data[0]?.summary_text || "No summary generated";
}

module.exports = summarizeText;