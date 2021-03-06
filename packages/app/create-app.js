import { h, createSSRApp, isReactive, reactive, computed } from 'vue'
import { createHead, useHead } from '@vueuse/head'
import { RouterView } from 'vue-router'
import { RouterLink, useRoutePath } from './'
import {
  AppComponent,
  NotFoundComponent,
  ErrorComponent,
} from '/.ream/templates/shared-exports.js'
import { onCreatedApp } from '/.ream/templates/enhance-app.js'

export const createApp = ({ router, initialState }) => {
  const app = createSSRApp({
    setup() {
      useHead({
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        ],
      })
      const store = isReactive(initialState)
        ? initialState
        : reactive(initialState)
      const routePath = useRoutePath()
      const preloadResult = computed(() => {
        if (store[routePath.value]) {
          return store[routePath.value]
        }
        if (Object.keys(store).length === 1 && store['/404.html']) {
          return store['/404.html']
        }
        return {}
      })
      return {
        initialState: store,
        preloadResult,
      }
    },
    render() {
      const { notFound, error } = this.preloadResult

      let Component = RouterView
      if (notFound) {
        Component = NotFoundComponent
      } else if (error) {
        Component = ErrorComponent
      }

      return h(AppComponent, {}, () => [h(Component)])
    },
  })

  const head = createHead()

  app.use(router)
  app.use(head)

  // Override Vue Router's RouterLink component
  // Can't use app.component() cause Vue will complain
  app._context.components[RouterLink.name] = RouterLink

  onCreatedApp({ app, router })

  return {
    app,
    router,
  }
}
