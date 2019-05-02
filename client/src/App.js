import React, { Component } from 'react';

import styled from 'styled-components';

const MainLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-gap: 2vw;
  grid-template-columns: minmax(auto,20%) repeat(2, 1fr);
  grid-template-areas: 
    "user events collection";
`;

class App extends Component {
  state = {
    gamesCollection: ['Root','Hanabi','Power Grid']
  }

  render() {
    return (
      <MainLayout>

        <aside style={{
          background: 'darkred',
          gridArea: 'user'
        }}>
          <h3>User/Profile info</h3>
        </aside>

        <section style={{
          background: 'lightblue',
          gridArea: 'events'
        }}>
          <h3>Events List</h3>
        </section>

        <section style={{
          background: 'lightgreen',
          gridArea: 'collection'
        }}>
          <h3>Games List</h3>
          {this.state.gamesCollection.map(coll => (
            <p>{coll}</p>
          ))}
        </section>

      </MainLayout>
    );
  }
}

export default App;
