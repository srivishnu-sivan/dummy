<script>
import { h } from 'vue'

export default {
  name: 'JbButtons',
  props: {
    noWrap: Boolean,
    glue: Boolean,
    type: {
      type: String,
      default: 'justify-start'
    },
    classAddon: {
      type: String,
      default: 'mr-3 last:mr-0 mb-3'
    },
    mb: {
      type: String,
      default: '-mb-3'
    }
  },
  render () {
    const hasSlot = this.$slots && this.$slots.default

    const mb = this.glue ? null : this.mb

    const noWrap = this.noWrap || this.glue

    const parentClass = [
      'flex',
      'items-center',
      this.type,
      noWrap ? 'flex-nowrap' : 'flex-wrap'
    ]

    if (mb) {
      parentClass.push(mb)
    }

    if (this.glue) {
      parentClass.push('-space-x-px')

      return h('div', { class: parentClass }, hasSlot ? this.$slots.default() : null)
    }

    return h(
      'div',
      { class: parentClass },
      hasSlot
        ? this.$slots.default().map(element => {
          if (element && element.children && typeof element.children === 'object') {
            return h(
              element,
              {},
              element.children.map(child => {
                return h(child, { class: [this.classAddon] })
              }))
          }

          return h(element, { class: [this.classAddon] })
        })
        : null
    )
  }
}
</script>
