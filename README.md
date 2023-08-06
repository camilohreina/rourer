## Tabla de Contenido

- [Comienza](#comienza)
- [API](#rourer-api)
  - **[Componentes](#component-api)**
    - **[`<Route />`](#route-pathpattern-)**
    - **[`<Link />`](#link-topath-)**
    - **[`<Router />`](#router-hookhook-matchermatchfn-basebasepath-)**

## Comienza

Esta es una demostración de una aplicación para comenzar:

```js
import { Link, Route } from "rourer";

const App = () => (
  <div>
    <Link to="/search/react">
      <a className="link">React</a>
    </Link>

    <Route path="/about">About Us</Route>
    <Route path="/search/:lang">{(params) => <div>It's, {params.lang}!</div>}</Route>
    <Route path="/home" component={HomePage} />
  </div>
);
```

## Rourer API

API similar a la de React Router. Si está creando una aplicación tradicional con
páginas y navegación: estos componentes pueden ser útiles.


### Lista de métodos disponibles.
**Component API:**

- **[`<Route />`](#route-pathpattern-)** — renderiza condicionalmente un componente basado en un patrón.
- **[`<Link />`](#link-topath-)** — elemento `<a>`, permite realizar una navegación.
- **[`<Router />`](#router-hookhook-matchermatchfn-basebasepath-)** — un nivel superior opcional
   componente para la configuración avanzada de enrutamiento.


## Component API

### `<Route path={pattern} />`

`Route` representa una parte de la aplicación que se representa condicionalmente en función de un patrón. El patrón es
una cadena, que puede contener caracteres especiales para describir segmentos dinámicos, consulte
[**Sección de segmentos dinámicos coincidentes**](#segmentos-dinámicos coincidentes) a continuación para obtener más detalles.

La libreria proporciona varias formas de declarar el cuerpo de una ruta:

```js
import { Route } from "rourer";

// forma simple
<Route path="/home"><Home /></Route>

// estilo  render-prop
<Route path="/users/:name">
  {params => <HomePage name={params.name} />}
</Route>

//las propiedades de 'params' serán pasadas al componente <Orders />
<Route path="/orders/:status" component={Orders} />
```
### `<Link to={path} />`

El componente Link representa un elemento `<a />` que, cuando se hace clic, realiza una navegación. Puede
personalizar la apariencia del enlace proporcionando su propio componente o un elemento de enlace como `children`:

```js
import { Link } from "rourer"

// Todos estos producirán el mismo html:
// <a href="/foo" class="active">Hello!</a>

// forma lazy: el elemento `a` se construye alrededor de los children
<Link to="/foo" className="active">Hello!</Link>

// cuando usas tu propio componente o jsx el accesorio `to`
// se pasará a un elemento
<Link to="/foo"><a className="active">Hello!</a></Link>
<Link to="/foo"><A>Hello!</A></Link>
```