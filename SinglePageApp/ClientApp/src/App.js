import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout.tsx';
import { AllProductItems } from './components/AllProductItems.tsx';
import { MaxPriceItems } from './components/MaxPriceItems.tsx';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
    <main>
      <Layout>
        <Redirect exact from="/" to="/product/items" />
        <Route exact path='/product/items' component={AllProductItems} />
        <Route exact path='/product/items/max-price' component={MaxPriceItems} />
      </Layout>
    </main>
    );
  }
}
