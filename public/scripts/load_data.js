document.getElementById("loadDataBtn").addEventListener("click", async () => {
    try {

        // Fetch node.js data
        const response = await fetch("/watchlist");
        const data = await response.json();

        // Getting table element from the html document
        const tableBody = document.getElementById("stockTableBody");

        data.forEach(stock => {
            const row = document.createElement("tr")        // create new row for incoming data

            const changeClass = stock.change <= 0 ? "text:success" : "text-danger";
            const sign = stock.change >= 0 ? "+" : "";

            row.innerHTML = `
                <td>${stock.symbol}</td>
                <td>${stock.company}</td>
                <td>$${stock.price}</td>
                <td class="${changeClass}">${sign}${stock.change}</td>
                <td class="${changeClass}">${sign}${stock.percent}%</td>
            `;
            tableBody.appendChild(row);     // adding stock based on template above to the html file
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
});