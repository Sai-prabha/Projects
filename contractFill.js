document.addEventListener('DOMContentLoaded', function() {
    loadLandlords();
    loadTenants();
});

function loadLandlords() {
    fetch('http://localhost:3000/landlords')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load landlords');
            return response.json();
        })
        .then(landlords => {
            console.log('Landlords:', landlords);  // Check what is actually being returned
            const landlordSelect = document.getElementById('cLandlord');
            landlords.forEach(landlord => {
                let option = new Option(`${landlord?.lFirstname} ${landlord?.lLastname}`, landlord?._id);
                landlordSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading landlords:', error);
            alert('Error loading landlords: ' + error.message);
        });
}

function loadTenants() {
    fetch('http://localhost:3000/tenants')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load tenants');
            return response.json();
        })
        .then(tenants => {
            console.log('Tenants:', tenants);
            const tenantSelect = document.getElementById('cTenants');
            tenants.forEach(tenant => {
                let option = new Option(`${tenant.tFirstname} ${tenant.tLastname}`, tenant._id);
                tenantSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading tenants:', error);
            alert('Error loading tenants: ' + error.message);
        });
}


function checkPropertyType(selectElement) {
    const otherPropertyTypeInput = document.getElementById('otherPropertyType');
    if (selectElement.value === 'Other') {
        otherPropertyTypeInput.classList.remove('d-none');
        otherPropertyTypeInput.required = true;
    } else {
        otherPropertyTypeInput.classList.add('d-none');
        otherPropertyTypeInput.value = '';
        otherPropertyTypeInput.required = false;
    }
}

document.getElementById('contractForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!this.checkValidity()) {
        event.stopPropagation();
        this.classList.add('was-validated');
        return;
    }
    submitContractForm();
});

function submitContractForm() {
    const formData = {
        contractDate: document.getElementById('contractDate')?.value,
        propertyAddress: document.getElementById('propertyAddress')?.value,
        cLandlord: document.getElementById('cLandlord')?.value,
        cTenants: Array.from(document.getElementById('cTenants').selectedOptions).map(option => option?.value),
        monthlyFee: document.getElementById('monthlyFee')?.value,
        propertyDoorNumber: document.getElementById('propertyDoorNumber')?.value,
        contractLength: document.getElementById('contractLength')?.value,
        propertyType: document.getElementById('propertyType')?.value,
    };

    console.log('Submitting contract:', formData);
    fetch('http://localhost:3000/contracts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to submit contract');
        return response.json();
    })
    .then(result => {
        console.log('Contract submitted successfully:', result);
        alert('Contract submitted successfully!');
    })
    .catch(error => {
        console.error('Error submitting contract:', error);
        alert('Failed to submit contract');
    });
}
