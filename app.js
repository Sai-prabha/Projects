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

function formatDateForInput(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}
function getData() {
    fetch('http://localhost:3000/landlords')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let html = '';
        if (data.length > 0) {
            data.forEach(landlord => {
                html += `
                <tr>
                    <td>${landlord.lTitle}</td>
                    <td>${landlord.lFirstname}</td>
                    <td>${landlord.lLastname}</td>
                    <td>${landlord.lPhone}</td>
                    <td>${landlord.lEmail}</td>
                    <td>${landlord.lAddress1}, ${landlord.lAddress2}</td>
                    <td>${landlord.lTown}</td>
                    <td>${landlord.lCounty}</td>
                    <td>${landlord.lEircode}</td>
                    <td>${formatDateForInput(landlord.DOB)}</td> <!-- Formatted DOB -->
                    <td>${landlord.councilPerm ? 'Yes' : 'No'}</td>
                    <td>${landlord.tenantPerm ? 'Yes' : 'No'}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="window.location.href='editLandlord.html?id=${landlord._id}'">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="deleteLandlord('${landlord._id}')">Delete</button>
                    </td>
                </tr>`;
            });
        } else {
            html = '<tr><td colspan="12">No data found</td></tr>';
        }
        document.getElementById('landlordsTable').innerHTML = html;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('landlordsTable').innerHTML = '<tr><td colspan="12">Failed to load data</td></tr>';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const addForm = document.getElementById('addLandlordForm');
    if (addForm) {
        addForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addLandlord();
        });
    }
});

function addLandlord() {
    const newLandlord = {
        lTitle: document.getElementById('lTitle').value,
        lFirstname: document.getElementById('lFirstname').value,
        lLastname: document.getElementById('lLastname').value,
        lPhone: document.getElementById('lPhone').value,
        lEmail: document.getElementById('lEmail').value,
        lAddress1: document.getElementById('lAddress1').value,
        lAddress2: document.getElementById('lAddress2').value,
        lTown: document.getElementById('lTown').value,
        lCounty: document.getElementById('lCounty').value,
        lEircode: document.getElementById('lEircode').value,
        DOB: document.getElementById('DOB').value,
        councilPerm: document.getElementById('councilPerm').checked,
        tenantPerm: document.getElementById('tenantPerm').checked
    };

    fetch('http://localhost:3000/landlords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLandlord)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create new landlord');
        }
        return response.json();
    })
    .then(() => {
        alert('New landlord added successfully');
        window.location.href = 'existLL.html';
    })
    .catch(error => {
        console.error('Error adding new landlord:', error);
        alert('Failed to add new landlord');
    });
}

function loadLandlordData() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    fetch(`http://localhost:3000/landlords/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('lTitle').value = data?.lTitle || '';
        document.getElementById('lFirstname').value = data?.lFirstname || '';
        document.getElementById('lLastname').value = data?.lLastname || '';
        document.getElementById('lPhone').value = data?.lPhone || '';
        document.getElementById('lEmail').value = data?.lEmail || '';
        document.getElementById('lAddress1').value = data?.lAddress1 || '';
        document.getElementById('lAddress2').value = data?.lAddress2 || '';
        document.getElementById('lTown').value = data?.lTown || '';
        document.getElementById('lCounty').value = data?.lCounty || '';
        document.getElementById('lEircode').value = data?.lEircode || '';
        document.getElementById('DOB').value = formatDateForInput(data?.DOB);
        document.getElementById('councilPerm').checked = data?.councilPerm || false;
        document.getElementById('tenantPerm').checked = data?.tenantPerm || false;
    })
    .catch(error => {
        console.error('Failed to fetch landlord:', error);
        alert('Failed to load data');
    });
}

function updateLandlord() {
    const id = new URLSearchParams(window.location.search).get('id');
    const updatedData = {
        lTitle: document.getElementById('lTitle').value,
        lFirstname: document.getElementById('lFirstname').value,
        lLastname: document.getElementById('lLastname').value,
        lPhone: document.getElementById('lPhone').value,
        lEmail: document.getElementById('lEmail').value,
        lAddress1: document.getElementById('lAddress1').value,
        lAddress2: document.getElementById('lAddress2').value,
        lTown: document.getElementById('lTown').value,
        lCounty: document.getElementById('lCounty').value,
        lEircode: document.getElementById('lEircode').value,
        DOB: document.getElementById('DOB').value,
        councilPerm: document.getElementById('councilPerm').value === "Yes",
        tenantPerm: document.getElementById('tenantPerm').value === "Yes"
    };

    fetch(`http://localhost:3000/landlords/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        alert('Landlord updated successfully');
        window.location.href = 'existLL.html';
    })
    .catch(error => {
        console.error('Failed to update landlord:', error);
        alert('Failed to update landlord');
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editLandlordForm');
    if(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            updateLandlord();
        });
    }
});

function deleteLandlord(landlordId) {
    if (!confirm('Are you sure you want to delete this landlord?')) return;

    fetch(`http://localhost:3000/landlords/${landlordId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        alert('Landlord deleted successfully');
        getData();
    })
    .catch(error => {
        console.error('Failed to delete landlord:', error);
        alert('Failed to delete landlord');
    });
}



window.onload = function() {
    if (window.location.pathname.includes('editLandlord.html')) {
        loadLandlordData();
    } else {
        getData();
    }
};
