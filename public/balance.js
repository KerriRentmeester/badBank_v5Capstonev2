function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <div className="balance">
    <Card
      bgcolor="warning"
      txtcolor="white"
      header="Balance"
      width="300px"
      status={status}
      body={show ? 
        <BalanceForm setShow={setShow} setStatus={setStatus} /> :
        <BalanceMsg setShow={setShow} setStatus={setStatus} />}
    />
    </div>
  );
}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="button" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');  // clears any previous error or status msg
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  

    // removed context and subbed this fnc
    // connect to BE
    function handle() {
      console.log(email, balance);  // sending these params to BE

      // API call to balance
      fetch(`/account/findOne/${email}`)
        .then((response) => response.json())  // Parse the response as JSON
        .then((data) => {
          try {
              setBalance(data.balance.toFixed(2)); // Set the balance in the state
              props.setStatus(`New Balance: $${data.balance.toFixed(2)}`);
              props.setShow(false);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Error parsing JSON');
              console.log('err:', err);
          }
        })
          .catch((error) => {
            props.setStatus('Error fetching balance');
            console.log('error:', error);
        });
    }

    function clearForm(){
      setEmail('');
      setBalance(''); // Clear the balance in the state
      props.setShow(true);
    }

    return (
      <>
        Email<br/>
        <input type="input" 
          className="form-control" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.currentTarget.value)}
        />
        <br />

        {/* Display the fetched balance */}
        {balance !== '' && <p>Current Balance: ${balance}</p>}

        <button type="button" className="btn btn-light" onClick={handle}>Check Balance</button>
      </>
    );
}