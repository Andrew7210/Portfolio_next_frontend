import React from 'react'

const SceneSection = ({static_container, container}) => {
  return (
    <section class="scene">
      <div class="static-container">
        <slot></slot>
      </div>
      <div class="container">
        <slot name="container"></slot>
      </div>
    </section>
  )
}

export default SceneSection