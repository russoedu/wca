import { Accessor } from 'solid-js'
import './Progress.css'

export default function ({ title, value }: {
  title: string,
  value: Accessor<number>
}) {
  function getFixed (): number {
    return Number(value().toFixed(2))
  }
  return (
    <div class="columns">
      <div class="column is-one-third">
        {title}
      </div>
      <div class="column">
        <progress class="progress is-large is-info has-info" value={getFixed()} max="100">
        </progress>
        <div class="progress-info">
          {getFixed()}%
        </div>
      </div>
    </div>
  )
}
