inject.css(`
  .mylink{
    display: block;
    margin-top: 10px;
  }
`, function(){

  function App(props){
    return (
      <div className="container">
        <h1>REACT DEMO</h1>
        <a className="mylink" href="https://www.github.com/webkixi/aotoo-hub" target="_blank" >GITHUB</a>
        <a className="mylink" href="http://www.agzgz.com" target="_blank" >官网</a>
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('reactroot'))
})


