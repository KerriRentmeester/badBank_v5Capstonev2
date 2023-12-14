function Home(){
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Page"
      width="300px"
      title="Welcome to the bank"
      text="For all your banking needs.  (Not really since there is no security in this bank!)"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
