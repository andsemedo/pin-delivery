
// Global variables
const api_url = 'https://aniltonf.com/api/pindelivery/';
const table_user = 'tb_user';
const table_package = 'tb_pacote';

// Get data from one user
async function getUserData(url, table_user, email) {
    const response = await fetch(url+'getUser.php?table='+table_user+'&email='+email);
    const jsonData = await response.json();
    console.log(jsonData);
}

const email = 'asf@cv.unipiaget.org';
// getUserData(api_url, table_user, email)

async function newUser(url, table, email, name, phone, address) {
    const response = await fetch(url+'newUser.php?table='+table+'&email='+email+'&nome='+name+'&telefone='+phone+'&endereco='+address);
    const jsonData = await response.json();
    console.log(jsonData.response);
}

// newUser(api_url, table_user, 'teste@teste.com', 'Teste Teste', '9999999', 'Praia, Cabo Verde')

async function newPackage(url, table, type, size, weight, from, name, to, owner) {
    const response = await fetch(url+'newPackage.php?table='+table+'&tipo='+type+'&tamanho='+size+'&peso='+weight+'&origem='+from+'&nome='+name+'&destino='+to+'&dono='+owner);
    const jsonData = await response.json();
    console.log(jsonData.response);
}

// newPackage(api_url, table_package, 'caixa', '30x90', '1.5', 'Praia, Cabo Verde', 'Maria Semedo', 'Paris, França', 'andsemedo023@gmail.com')


async function updatePackageStatus(url, table, pId, newStatus) { 
    const response = await fetch(url+'updatePackageStatus.php?table='+table+'&packageId='+pId+'&status='+newStatus);
    const jsonData = response.json();
    console.log(jsonData.response);
}

// updatePackageStatus(api_url, table_package, 2, 'Destino')

async function getUserActivePackage(url, table, email) { 
    const response = await fetch(url+'getUserActivePackage.php?table='+table+'&email='+email);
    const jsonData = await response.json();
    console.log(jsonData);
}

getUserActivePackage(api_url, table_package, 'andsemedo023@gmail.com')