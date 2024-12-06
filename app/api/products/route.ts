export async function GET() {
    return fetch('https://deisishop.pythonanywhere.com/products/')
        .then(res => res.json()) // Converte a resposta para JSON
        .then(data => Response.json(data)); // Retorna os dados como uma resposta JSON
}
