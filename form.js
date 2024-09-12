document.addEventListener('DOMContentLoaded', function() {
    function checkOtherTitle(selectElement) {
        const lOtherTitleWrapper = document.getElementById('lOtherTitleWrapper');
        const lOtherTitleInput = document.getElementById('lOtherTitle');
        const tOtherTitleWrapper = document.getElementById('tOtherTitleWrapper');
        const tOtherTitleInput = document.getElementById('tOtherTitle');
        if (selectElement.value === 'Other') {
            lOtherTitleWrapper.style.display = 'block'; 
            lOtherTitleInput.required = true;
            tOtherTitleWrapper.style.display = 'block'; 
            tOtherTitleInput.required = true;
        } else {
            lOtherTitleWrapper.style.display = 'none';
            lOtherTitleInput.required = false;
            tOtherTitleWrapper.style.display = 'none';
            tOtherTitleInput.required = false;
        }
    }

    // Handle form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }
            alert('Form submitted successfully!');
        });
    });

    // Send data to server
    function sendDataToServer(field, value) {
        fetch('/landlords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [field]: value }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }

    // Handle councilPerm and tenantPerm checkbox changes
    const councilPermCheckbox = document.getElementById('councilPerm');
    const tenantPermCheckbox = document.getElementById('tenantPerm');

    if (councilPermCheckbox) {
        councilPermCheckbox.addEventListener('change', function() {
            const value = this.checked ? 'yes' : 'no';
            console.log('Council Permission:', value);
            sendDataToServer('councilPerm', value);
        });
    }

    if (tenantPermCheckbox) {
        tenantPermCheckbox.addEventListener('change', function() {
            const value = this.checked ? 'yes' : 'no';
            console.log('Tenant Permission:', value);
            sendDataToServer('tenantPerm', value);
        });
    }

    // Handle propertyType selection
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

    // Handle landlord form submission
    const landlordForm = document.getElementById('landlordForm');
    if (landlordForm) {
        landlordForm.addEventListener('submit', function(event) {
            event.preventDefault();
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
            addLandlord(newLandlord);
        });
    }

    function addLandlord(landlordData) {
        fetch('http://localhost:3000/landlords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(landlordData)
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

    // Handle tenant form submission
    const tenantForm = document.getElementById('tenantForm');
    if (tenantForm) {
        tenantForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newTenant = {
                tTitle: document.getElementById('tTitle')?.value,
                tFirstname: document.getElementById('tFirstname')?.value,
                tLastname: document.getElementById('tLastname').value,
                tPhone: document.getElementById('tPhone')?.value,
                tEmail: document.getElementById('tEmail')?.value,
                tAddress1: document.getElementById('tAddress1')?.value,
                tAddress2: document.getElementById('tAddress2')?.value,
                tTown: document.getElementById('tTown')?.value,
                tCounty: document.getElementById('tCounty')?.value,
                tEircode: document.getElementById('tEircode')?.value
            };
            addTenant(newTenant); 
        });
    }

    function addTenant(tenantData) {
        fetch('http://localhost:3000/tenants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tenantData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create new tenant');
            }
            return response.json();
        })
        .then(() => {
            alert('New tenant added successfully');
            window.location.href = 'existT.html'; // Optionally redirect to the tenant list page
        })
        .catch(error => {
            console.error('Error adding new tenant:', error);
            alert('Failed to add new tenant');
        });
    }

    // Handle contract form submission
    const contractForm = document.getElementById('contractForm');
    if (contractForm) {
        contractForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const selectedTenants = Array.from(document.getElementById('cTenants').selectedOptions);

            // Check if the number of selected tenants is within the required range
            if (selectedTenants.length < 1 || selectedTenants.length > 3) {
                document.getElementById('cTenants').classList.add('is-invalid');
                return;
            } else {
                document.getElementById('cTenants').classList.remove('is-invalid');
            }

            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }
            submitContractForm();
        });
    }

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
            window.location.href = 'existContracts.html'; // Redirect after successful submission
        })
        .catch(error => {
            console.error('Error submitting contract:', error);
            alert('Failed to submit contract');
        });
    }
});
