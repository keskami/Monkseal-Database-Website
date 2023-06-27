async function getUser() {

    try {
      const response = await fetch('http://localhost:3000/api/v1/monkseals/', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        
        },
        
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log( result);
    } catch (err) {
      console.log(err);
    }
  }
  
  getUser();