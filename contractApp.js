document.addEventListener('DOMContentLoaded', function() {
    setActiveLink();
});

function setActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-item.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(currentPath)) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('editContract.html')) {
        loadContractData();
        loadLandlords();
        loadTenants();
    } else {
        getData();
    }
});

function formatDateForInput(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

function loadLandlords() {
    fetch('http://localhost:3000/landlords')
    .then(response => response.json())
    .then(landlords => {
        const landlordSelect = document.getElementById('cLandlord');
        landlordSelect.innerHTML = ''; 
        landlords.forEach(landlord => {
            let option = new Option(`${landlord.lFirstname} ${landlord.lLastname}`, landlord._id);
            landlordSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error loading landlords:', error));
}

function loadTenants() {
    fetch('http://localhost:3000/tenants')
    .then(response => response.json())
    .then(tenants => {
        const tenantSelect = document.getElementById('cTenants');
        tenantSelect.innerHTML = '';
        tenants.forEach(tenant => {
            let option = new Option(`${tenant.tFirstname} ${tenant.tLastname}`, tenant._id);
            tenantSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error loading tenants:', error));
}

function loadContractData() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    fetch(`http://localhost:3000/contracts/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            document.getElementById('contractDate').value = formatDateForInput(data?.contractDate);
            document.getElementById('propertyAddress').value = data?.propertyAddress;
            document.getElementById('cLandlord').value = data?.Landlord?._id;
            document.getElementById('monthlyFee').value = data?.monthlyFee;
            document.getElementById('propertyDoorNumber').value = data?.propertyDoorNumber;
            document.getElementById('contractLength').value = data?.contractLength;
            document.getElementById('propertyType').value = data?.propertyType;
            const tenantSelect = document.getElementById('cTenants');
            data?.cTenants?.forEach(tenant => {
                for (let option of tenantSelect.options) {
                    if (option.value === tenant?._id) {
                        option.selected = true;
                    }
                }
            });
        })
        .catch(error => {
            console.error('Failed to fetch contract:', error);
            alert('Failed to load data');
        });
}

function updateContract() {
    const id = new URLSearchParams(window.location.search).get('id');
    const updatedContract = {
        contractDate: new Date(document.getElementById('contractDate').value).toISOString(),
        propertyAddress: document.getElementById('propertyAddress').value,
        cLandlord: document.getElementById('cLandlord').value,
        cTenants: Array.from(document.getElementById('cTenants').selectedOptions).map(option => option.value),
        monthlyFee: document.getElementById('monthlyFee').value,
        propertyDoorNumber: document.getElementById('propertyDoorNumber').value,
        contractLength: document.getElementById('contractLength').value,
        propertyType: document.getElementById('propertyType').value,
    };

    fetch(`http://localhost:3000/contracts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedContract)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update contract');
        }
        return response.json();
    })
    .then(() => {
        alert('Contract updated successfully');
        window.location.href = 'existContracts.html';
    })
    .catch(error => {
        console.error('Failed to update contract:', error);
        alert('Failed to update contract');
    });
}

function getData() {
    fetch('http://localhost:3000/contracts')
    .then(response => response.json())
    .then(contracts => {
        let html = '';
        contracts.forEach(contract => {
            const tenantNames = contract.cTenants.map(tenant => `${tenant.tFirstname} ${tenant.tLastname}`).join(", ");
            const landlordName = `${contract.cLandlord.lFirstname} ${contract.cLandlord.lLastname}`;
            html += `
                <tr>
                    <td>${formatDateForInput(contract.contractDate)}</td>
                    <td>${contract.contractLength}</td>
                    <td>${contract.propertyAddress}</td>
                    <td>${landlordName}</td>
                    <td>${tenantNames}</td>
                    <td>${contract.monthlyFee}</td>
                    <td>${contract.propertyDoorNumber}</td>
                    <td>${contract.propertyType}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="window.location.href='editContract.html?id=${contract._id}'">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="deleteContract('${contract._id}')">Delete</button>
                    </td>
                </tr>`;
        });
        document.getElementById('contractsTable').innerHTML = html;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('contractsTable').innerHTML = '<tr><td colspan="9">Failed to load data</td></tr>';
    });
}
