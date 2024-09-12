function loadTenantContent() {
    // Hide landlord content
    document.getElementById('landlordContent').style.display = 'none';
    // document.getElementById('contractContent').style.display = 'none';
    // Show tenant content
    document.getElementById('tenantContent').style.display = 'block';
    // Add 'active' class to Tenant button and remove it from LandLord button
    document.getElementById('tenantButton').classList.add('active');
    document.getElementById('landlordButton').classList.remove('active');
    // document.getElementById('contractButton').classList.remove('active');

}

function loadLandlordContent() {
    // Hide tenant content
    document.getElementById('tenantContent').style.display = 'none';
    // document.getElementById('contractContent').style.display = 'none';
    // Show landlord content
    document.getElementById('landlordContent').style.display = 'block';
    // Add 'active' class to LandLord button and remove it from Tenant button
    document.getElementById('landlordButton').classList.add('active');
    document.getElementById('tenantButton').classList.remove('active');
    // document.getElementById('contractButton').classList.remove('active');
}

function loadContractContent() {
    window.location.href = 'contract.html';
    // Remove 'active' class from both buttons
    document.getElementById('contractButton').classList.add('active');
    document.getElementById('tenantButton').classList.remove('active');
    document.getElementById('landlordButton').classList.remove('active');
    
}

