const clients = [{
        id: 1,
        taxNumber: '86620855',
        name: 'HECTOR ACUÑA BOLAÑOS'
    },
    {
        id: 2,
        taxNumber: '7317855K',
        name: 'JESUS RODRIGUEZ ALVAREZ'
    },
    {
        id: 3,
        taxNumber: '73826497',
        name: 'ANDRES NADAL MOLINA'
    },
    {
        id: 4,
        taxNumber: '88587715',
        name: 'SALVADOR ARNEDO MANRIQUEZ'
    },
    {
        id: 5,
        taxNumber: '94020190',
        name: 'VICTOR MANUEL ROJAS LUCAS'
    },
    {
        id: 6,
        taxNumber: '99804238',
        name: 'MOHAMED FERRE SAMPER'
    }
];
const accounts = [{
        clientId: 6,
        bankId: 1,
        balance: 15000
    },
    {
        clientId: 1,
        bankId: 3,
        balance: 18000
    },
    {
        clientId: 5,
        bankId: 3,
        balance: 135000
    },
    {
        clientId: 2,
        bankId: 2,
        balance: 5600
    },
    {
        clientId: 3,
        bankId: 1,
        balance: 23000
    },
    {
        clientId: 5,
        bankId: 2,
        balance: 15000
    },
    {
        clientId: 3,
        bankId: 3,
        balance: 45900
    },
    {
        clientId: 2,
        bankId: 3,
        balance: 19000
    },
    {
        clientId: 4,
        bankId: 3,
        balance: 51000
    },
    {
        clientId: 5,
        bankId: 1,
        balance: 89000
    },
    {
        clientId: 1,
        bankId: 2,
        balance: 1600
    },
    {
        clientId: 5,
        bankId: 3,
        balance: 37500
    },
    {
        clientId: 6,
        bankId: 1,
        balance: 19200
    },
    {
        clientId: 2,
        bankId: 3,
        balance: 10000
    },
    {
        clientId: 3,
        bankId: 2,
        balance: 5400
    },
    {
        clientId: 3,
        bankId: 1,
        balance: 9000
    },
    {
        clientId: 4,
        bankId: 3,
        balance: 13500
    },
    {
        clientId: 2,
        bankId: 1,
        balance: 38200
    },
    {
        clientId: 5,
        bankId: 2,
        balance: 17000
    },
    {
        clientId: 1,
        bankId: 3,
        balance: 1000
    },
    {
        clientId: 5,
        bankId: 2,
        balance: 600
    },
    {
        clientId: 6,
        bankId: 1,
        balance: 16200
    },
    {
        clientId: 2,
        bankId: 2,
        balance: 10000
    }
]
const banks = [{
        id: 1,
        name: 'SANTANDER'
    },
    {
        id: 2,
        name: 'CHILE'
    },
    {
        id: 3,
        name: 'ESTADO'
    }
];

listClientsIds = () => {
    let idsClients = clients.map(({id}) => id);
    return idsClients;
}

listClientsIdsSortByTaxNumber = () => {
    let localClients = clients;
    localClients.sort(({taxNumber1}, {taxNumber2}) => taxNumber1 > taxNumber2 ? 1 : -1);
    let idsClients = localClients.map(({id}) => id);
    return idsClients;
}


inArray = (needle, haystack) => {
    const length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}



const sumBalances = obj => Object.values(obj).reduce((a, b) => a + b);

sortClientsTotalBalances = () => {
    let localClients = clients;
    let localAccounts = accounts;
    let balanceClients = [];
    for (let i = 0; i < localClients.length; i++) {
        const id = localClients[i].id;
        let filterAccountByClient = localAccounts.filter(({clientId}) => clientId == id);
        let saldos = filterAccountByClient.map(({balance}) => balance);
        balanceClients.push({
            id : id,
            name : localClients[i].name,
            balance : sumBalances(saldos)
        });
    }
    balanceClients.sort(({balance1}, {balance2}) => balance1 > balance2 ? -1 : 1);
    let nameClients = balanceClients.map(({name}) => name);
    return nameClients
}


banksClientsTaxNumbers = () => {
    let object = {};
    let localClients = clients;
    localClients.sort(({name1}, {name2}) => name1 > name2 ? -1 : 1);
    for (let i = 0; i < banks.length; i++) {
        const id = banks[i].id;
        let filterAccountByBank = accounts.filter(({bankId}) => bankId == id);
        let idsClients = filterAccountByBank.map(({clientId}) => clientId);
        idsClients = [...new Set(idsClients)];
        let filterClientById = localClients.filter(client => inArray(client.id, idsClients));
        filterClientById.sort(({name1}, {name2}) => name1 > name2 ? 1 : -1);

        let taxNumberClients = filterClientById.map(({taxNumber}) => taxNumber);
        object[banks[i].name] = taxNumberClients;

    }
    return object;
}

richClientsBalances = () => {
    let localClients = clients;
    let balanceClients = [];
    let filterAccountByBank = accounts.filter(({bankId}) => bankId == 1);
    let idsClients = filterAccountByBank.map(({clientId}) => clientId);
    idsClients = [...new Set(idsClients)];

    for (const id of idsClients) {
        let filterAccountByClient = filterAccountByBank.filter(({clientId}) => clientId == id);
        let saldos = filterAccountByClient.map(({balance}) => balance);
        balanceClients.push(sumBalances(saldos));
    }
    balanceClients = balanceClients.filter(balance => balance > 25000);
    balanceClients.sort((a, b) => (a > b ? -1 : 1)); // Decreciente
    return balanceClients;
}

banksRankingByTotalBalance = () => {
    let localBanks = banks;
    let balanceBank = [];
    for (let i = 0; i < localBanks.length; i++) {
        const id = localBanks[i].id;
        let filterAccountByBank = accounts.filter(({bankId}) => bankId == id);
        let saldos = filterAccountByBank.map(({balance}) => balance);
        balanceBank.push({
            id: id,
            balance : sumBalances(saldos)
        });
    }
    balanceBank.sort(({balance1}, {balance2}) => balance1 > balance2 ? 1 : -1); // Creciente
    return balanceBank.map(({id}) => id);
}

banksFidelity = () => {
    let object = {};
    let banksClients = {};
    idsClients = clients.map(({id}) => id);
    for (var i = 0; i < banks.length; i++) {
        const id = banks[i].id;
        let filterAccountByBank = accounts.filter(({bankId}) => bankId == id);
        let idsClientsBank = filterAccountByBank.map(({clientId}) => clientId);
        idsClientsBank = [...new Set(idsClientsBank)];
        banksClients[id] = idsClientsBank;
    }
    for (var i = 0; i < banks.length; i++) {
        let bank = banksClients[banks[i].id];
        object[banks[i].name] = bank.filter(clients => {
            if(banks[i].id == 1) {return !banksClients[2].includes(clients) && !banksClients[3].includes(clients);};
            if(banks[i].id == 2) {return !banksClients[1].includes(clients) && !banksClients[3].includes(clients);};
            if(banks[i].id == 3) {return !banksClients[2].includes(clients) && !banksClients[1].includes(clients);};
        }).length;
    }
    return object;
}


banksPoorClients = () => {
    let object = {};
    let banksClients = {};
    idsClients = clients.map(({id}) => id);
    for (let i = 0; i < banks.length; i++) {
        let balanceClients = [];
        const id = banks[i].id;
        let filterAccountByBank = accounts.filter(({bankId}) => bankId == id);
        let idsClientsBank = filterAccountByBank.map(({clientId}) => clientId);
        idsClientsBank = [...new Set(idsClientsBank)];
        for (let j = 0; j < idsClientsBank.length; j++) {
            const idClient = idsClientsBank[j];
            let filterAccountByClient = filterAccountByBank.filter(({clientId}) => clientId == idClient);
            let saldos = filterAccountByClient.map(({balance}) => balance);
            balanceClients.push({
                id : idClient,
                balance : sumBalances(saldos)
            });
        }
        balanceClients.sort(({balance1}, {balance2}) => balance1 > balance2 ? 1 : -1); // Creciente
        object[banks[i].name] = balanceClients[0].id;
    }

    return object;
}
newClientRanking = () => {
    let localClients = clients;
    localClients.push({id: 7, taxNumber: "123456789", name: 'LUIS EDUARDO ROJAS ROCO'})
    let localAccounts = accounts;
    localAccounts.push({clientId: 7, bankId: 3, balance: 9000});


    let balanceClients = [];
    for (let i = 0; i < localClients.length; i++) {
        const id = localClients[i].id;
        let filterAccountByClient = localAccounts.filter(({clientId}) => clientId == id);
        let saldos = filterAccountByClient.map(({balance}) => balance);
        balanceClients.push({
            id,
            balance : sumBalances(saldos)
        });
    }
    balanceClients.sort(({balance1}, {balance2}) => balance1 > balance2 ? -1 : 1);
    return balanceClients.findIndex(({id}) => id == 7);
}

console.log('Pregunta 0');
console.log(listClientsIds());
console.log('Pregunta 1');
console.log(listClientsIdsSortByTaxNumber());
console.log('Pregunta 2');
console.log(sortClientsTotalBalances());
console.log('Pregunta 3');
console.log(banksClientsTaxNumbers());
console.log('Pregunta 4');
console.log(richClientsBalances());
console.log('Pregunta 5');
console.log(banksRankingByTotalBalance());
console.log('Pregunta 6');
console.log(banksFidelity());
console.log('Pregunta 7');
console.log(banksPoorClients());
console.log('Pregunta 8');
console.log(newClientRanking());