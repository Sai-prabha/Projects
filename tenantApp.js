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

function getData() {
    fetch('http://localhost:3000/tenants')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let html = '';
        if (data.length > 0) {
            data.forEach(tenant => {
                html += `
                <tr>
                    <td>${tenant.tTitle}</td>
                    <td>${tenant.tFirstname}</td>
                    <td>${tenant.tLastname}</td>
                    <td>${tenant.tPhone}</td>
                    <td>${tenant.tEmail}</td>
                    <td>${tenant.tAddress1}, ${tenant.tAddress2}</td>
                    <td>${tenant.tTown}</td>
                    <td>${tenant.tCounty}</td>
                    <td>${tenant.tEircode}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="window.location.href='editTenant.html?id=${tenant._id}'">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="deleteTenant('${tenant._id}')">Delete</button>
                    </td>
                </tr>`;
            });
        } else {
            html = '<tr><td colspan="9">No data found</td></tr>';
        }
        document.getElementById('tenantsTable').innerHTML = html;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('tenantsTable').innerHTML = '<tr><td colspan="9">Failed to load data</td></tr>';
    });
}

function loadTenantData() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id'); 

    if (!id) {
        console.error('No ID in query string');
        return;
    }

    fetch(`http://localhost:3000/tenants/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetched data:", data); // Log the entire data object to inspect its structure

        // Check if the data keys actually exist and match your expectations
        document.getElementById('tTitle').value = data?.tTitle || '';
        document.getElementById('tFirstname').value = data?.tFirstname || '';
        document.getElementById('tLastname').value = data?.tLastname || '';
        document.getElementById('tPhone').value = data?.tPhone || '';
        document.getElementById('tEmail').value = data?.tEmail || '';
        document.getElementById('tAddress1').value = data?.tAddress1 || '';
        document.getElementById('tAddress2').value = data?.tAddress2 || '';
        document.getElementById('tTown').value = data?.tTown || '';
        document.getElementById('tCounty').value = data?.tCounty || '';
        document.getElementById('tEircode').value = data?.tEircode || '';
    })
    .catch(error => {
        console.error('Failed to fetch tenant:', error);
        alert(`Failed to load tenant data: ${error.message}`);
    });
}



function updateTenant() {
    const id = new URLSearchParams(window.location.search).get('id');
    const updatedTenant = {
        tTitle: document.getElementById('tTitle')?.value,
        tFirstname: document.getElementById('tFirstname')?.value,
        tLastname: document.getElementById('tLastname')?.value,
        tPhone: document.getElementById('tPhone')?.value,
        tEmail: document.getElementById('tEmail')?.value,
        tAddress1: document.getElementById('tAddress1')?.value,
        tAddress2: document.getElementById('tAddress2')?.value,
        tTown: document.getElementById('tTown')?.value,
        tCounty: document.getElementById('tCounty')?.value,
        tEircode: document.getElementById('tEircode')?.value,
    };

    fetch(`http://localhost:3000/tenants/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTenant),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        alert('Tenant updated successfully');
        window.location.href = 'existT.html';
    })
    .catch(error => {
        console.error('Failed to update tenant:', error);
        alert('Failed to update tenant');
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editTenantForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            updateTenant();
        });
    }
});

function deleteTenant(tenantId) {
    if (!confirm('Are you sure you want to delete this tenant?')) return;

    fetch(`http://localhost:3000/tenants/${tenantId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        alert('Tenant deleted successfully');
        // document.querySelector(`tr[data-tenant-id="${tenantId}"]`).remove();
        getData();
    })
    .catch(error => {
        console.error('Failed to delete tenant:', error);
        alert('Failed to delete tenant');
    });
}

window.onload = function() {
    if (window.location.pathname.includes('editTenant.html')) {
        loadTenantData();
    }else{
        getData();
    }
};
