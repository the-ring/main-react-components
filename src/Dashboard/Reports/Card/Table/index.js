'use strict';

import React, { PropTypes, Component } from 'react';
import Row from './Row';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.prepareData = this.prepareData.bind(this);
  }

  componentDidMount() {
    Ps.initialize(this.refs.table);
  }

  prepareData() {
    const { google: g, yandex: y, median: m } = this.props.data;
    const data = [];

    for (const key in g) {
      data.push([moment(key, 'YYYYMMDD').format('LL'), [g[key], y[key], m[key]]]);
    }

    return data || [];
  }

  render() {
    const { scrollable, header } = this.props;
    return (
      <div className="table table--color-inverse">
        <div className="table__head">
          <Row data={header} />
        </div>
        <div ref="table" className="table__body" data-scrollable={scrollable}>
          {this.prepareData().map((r, i) => <Row key={i} data={r} />)}
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.object,
  scrollable: PropTypes.any,
  header: PropTypes.array
};
