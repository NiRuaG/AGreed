import React, { Component } from 'react';

class App extends Component {
  state = {
    gamesCollection: ['Root','Hanabi','Power Grid']
  } 

  render() {
    return (
      <div style={{
        // grid
      }}>

        <aside style={{ background: 'red' }}>
          User/Profile info
        </aside>

        <section style={{ background: 'blue' }}>
          Events List
        </section>

        <section style={{ background: 'green ' }}>
          <h>Games List</h>
          {this.state.gamesCollection.map(coll => (
            <p>{coll}</p>
          ))}
        </section>

      </div>
    );
  }
}

export default App;
