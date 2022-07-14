let account = [
    {
        id: 0,
        type: 'incomes',
        title: 'Salary',
        amount: 0,
        date: new Date('2022-07-22')
    },
    {
        id: 1,
        type: 'expenses',
        title: 'Mortgage',
        amount: -50,
        date: new Date('2022-07-22')
    },    
    {
        id: 2,
        type: 'expenses',
        title: 'Car',
        amount: -50,
        date: new Date('2022-07-22')
    },
];

const buttonAdd = document.querySelector('.buttonAdd');
buttonAdd.addEventListener('click', () => addTransaction());

function addTransaction() {
    balance = 0;

    const type = document.querySelector('input[name="type"]:checked').value;
    const title = document.querySelector('#inputTitle').value;
    const amount = Number(document.querySelector('#inputAmount').value);
    const transaction = {
        type: type,
        title: title,
        amount: amount,
        date: new Date(),
    };

    account.push(transaction);
    renderTransactionsTable();
}

// Render all the transactions 
function renderTransactionsTable() {
    let balance = 0;
    let expenses = 0;
    let incomes = 0;

    const tbody = document.querySelector('#tbody');
    tbody.innerHTML = '';

    account.forEach(({id ,type, title, amount, date}, index) => {
        balance += amount;

        const category = (type === 'expenses') ? 'Expense' : 'Income';
        const formatedDate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;

        const tr = document.createElement('tr');
        tbody.appendChild(tr);

        const tdCategory = document.createElement('td');
        tdCategory.innerHTML = `<span class=${type}>${category}</span>`;
        tr.appendChild(tdCategory);

        const tdTitle = document.createElement('td');
        tdTitle.innerHTML = `${title}`;
        tr.appendChild(tdTitle);

        const tdAmount = document.createElement('td');
        tdAmount.innerHTML = `${amount.toFixed(2)}`;
        tr.appendChild(tdAmount);

        const tdDate = document.createElement('td');
        tdDate.innerHTML = `${formatedDate}`;
        tr.appendChild(tdDate);
 
        // Button Remove
        const buttonRemove = document.createElement('button');
        const textButtonRemove = document.createTextNode('x');
        buttonRemove.setAttribute('class', 'btnRemove');
        buttonRemove.append(textButtonRemove);
        buttonRemove.addEventListener('click', () => {
            // Remove item according to the position in the array list and render a new list
            account.splice(index, 1);
            renderTransactionsTable();
        });

        const tdActions = document.createElement('td');
        tdActions.append(buttonRemove);
        tr.appendChild(tdActions);
    });

    const elementBalance = document.querySelector('#elementBalance');
    const classBalance = (balance < 0) ? 'negative' : 'positive';
    elementBalance.innerHTML = `Balance: <span class=${classBalance}>${balance.toFixed(2)}</span>`;

    // Reset balance to the next rendering, cause if not it will sum the previous rendering balance value + next rendering value
    balance = 0;
}

// Render when page is loaded first time
renderTransactionsTable();