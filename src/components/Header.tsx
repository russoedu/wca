import { createSignal } from 'solid-js'
import { Link } from 'solid-app-router'
import logo from './logo.svg';
import './Header.css'

export default function () {
  const [burgerIsActive, setBurgerIsActive] = createSignal('')
  const openMenu = () => {
    setBurgerIsActive(burgerIsActive() === '' ? ' is-active' : '')
  }

  return (
    <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <Link class="navbar-item" href="/">
          <img src={logo}></img>
        </Link>
        <a role="button" class={'navbar-burger' + burgerIsActive()} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={openMenu}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class={'navbar-menu' + burgerIsActive()}>
        <div class="navbar-end">
          <Link class="navbar-item" href="/about">
            About
          </Link>
          <div class="navbar-item has-dropdown is-hoverable">
            <div id={"language-dropdown"} class="navbar-link">
              Language
            </div>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item">English</a>
              <a class="navbar-item">Português</a>
              <hr class="navbar-divider" />
              <a class="navbar-item">Translate</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}