import { Accessor } from 'solid-js'
import './Progress.module.css'

type progressData = {
  id: string,
  title: string,
  val: Accessor<number>
}

export default function ({ id, title, val }: progressData) {
  return (
    <div class="columns">
      <div class="column is-one-third">
        {title} {val()}
      </div>
      <div class="column">
        <progress id={id} class="progress is-large is-info" value={val()} max="10000">{val()}%</progress>
      </div>
    </div>
  )
}
