document.getElementById("loadDataBtn").addEventListener("click", async () => {
    const tableBody = document.getElementById("stockTableBody");
    tableBody.innerHTML = ""; // clear placeholder rows before loading fresh data

    try {

        // GET all json data for watchlist
        const response = await fetch("/watchlist");
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const data = await response.json();


        // Made it so it doesnt append data to the end and just refreshes data.
        data.forEach(stock => {
            const row = document.createElement("tr"); // create new row for incoming data
            const isPositive = stock.change >= 0;
            const changeClass = isPositive ? "text-success" : "text-danger";
            const sign = isPositive ? "+" : "";

            row.innerHTML = `
                <td>${stock.symbol}</td>
                <td>${stock.company}</td>
                <td>$${stock.price}</td>
                <td class="${changeClass}">${sign}${stock.change}</td>
                <td class="${changeClass}">${sign}${stock.percent}%</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
        tableBody.innerHTML = `<tr><td colspan="5" class="text-danger">Unable to load watchlist</td></tr>`;
    }
});
