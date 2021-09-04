import { createSignal } from 'solid-js'
import { Link } from 'solid-app-router'
import logo from '../assets/logo.svg';
import './Header.css'

export default function () {
  const [burgerIsActive, setBurgerIsActive] = createSignal('')
  const openMenu = () => {
    setBurgerIsActive(burgerIsActive() === '' ? ' is-active' : '')
  }

  return (
    <nav class="navbar is-fixed-top navbar-style" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <Link class="navbar-item" href="/">
          <img src={logo}></img>
        </Link>
        <a role="button" class={'navbar-burger item-style' + burgerIsActive()} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={openMenu}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class={'navbar-menu' + burgerIsActive()}>
        <div class="navbar-end">
          <Link class="navbar-item item-style navbar-style" href="/about">
            About
          </Link>
          <div class="navbar-item has-dropdown is-hoverable item-style">
            <div id={"language-dropdown"} class="navbar-link item-style navbar-style">
              Language
            </div>
            <div class="navbar-dropdown is-boxed navbar-style">
              <a class="navbar-item item-style">English</a>
              <a class="navbar-item item-style">Português</a>
              <hr class="navbar-divider item-style" />
              <a class="navbar-item item-style">Translate</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}