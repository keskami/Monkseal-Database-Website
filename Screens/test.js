


async function getUser() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/monkseals/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hawaiisighting: 'x',
        sealid: 'RK26',
        dorsalscar: 'x',
        dorsalbleach: 'x',
        lefttag: 'K26'
        // Add more key-value pairs as needed
      }),
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

getUser();