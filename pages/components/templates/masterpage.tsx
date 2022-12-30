import * as React from 'react'

export function MasterPage(layout: any, props: any) {
  return (Comp: any): any => {
    class WrapperComponent extends Comp {
      render() {
        return React.createElement(
          layout,
          { props, ...this.props },
          React.createElement(Comp, this.props),
        )
      }
    }
    return WrapperComponent
  }
}