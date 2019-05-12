import React, { useState } from 'react';

import styled from 'styled-components';

import Collection from './components/Collection';
import FormBGG    from './components/FormBGG';


const MainLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-gap: 2vw;
  grid-template-columns: minmax(auto,20%) repeat(2, 1fr);
  grid-template-areas: 
    "user events collection";
`;

const CollectionSection = styled.section`
  background: lightgreen;
  grid-area: collection;
`;

// const StyledCollection = styled(Collection)`
// `;


export default function App() {

  const [gamesCollection, /*setGamesCollection*/] = 
    useState([
      { id: 1, title: 'Root' },
      { id: 2, title: 'Hanabi' },
      { id: 3, title: 'Power Grid' },
    ]);

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

      <CollectionSection>
        <h3>Games List</h3>

        <FormBGG />

        <Collection
          coll={gamesCollection}
        />
      </CollectionSection>

    </MainLayout>
  );

}
