import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Types from 'Types';


interface BreadcrumbsProps {
  route: any;
}

const BreadcrumbsComponent = (props: BreadcrumbsProps) => {
  const routes: {[index: string]: {name: string, url: () => string}} = {
    '/': {
      'name': 'Journals',
      'url': () => ('/'),
    },
    '/journal/:journalId': {
      'name': 'Journal',
      'url': () => ('/journal/' + props.route.params.journalId),
    },
    '/journal/:journalId/trade/:tradeId': {
      'name': 'Trade',
      'url': () => ('/journal/' + props.route.params.journalId + '/trade/' + props.route.params.tradeId),
    },
  }

  const crumbs: {[index: string]: {name: string, url: () => string}[]} = {
    '/': [routes['/']],
    '/journal/:journalId': [routes['/'], routes['/journal/:journalId']],
    '/journal/:journalId/trade/:tradeId': [routes['/'], routes['/journal/:journalId'], routes['/journal/:journalId/trade/:tradeId']],
  }

  if (props.route && props.route.path && props.route.params) {
    return (
      <nav aria-label="breadcrumb bg-transparent">
        <ol className="breadcrumb bg-transparent">
          {crumbs[props.route.path].map((r: any) => <li className='breadcrumb-item' key={r.name}><Link to={r.url()}>{r.name}</Link></li>)}
        </ol>
      </nav>
    )
  } else {
    return null
  }
};

const mapStateToProps = (state: Types.RootState) => {
  return {
    route: state.app.route,
  }
};

export const Breadcrumbs = connect(mapStateToProps)(BreadcrumbsComponent);