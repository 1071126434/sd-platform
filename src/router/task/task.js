const Task = (resolve) => {
  import('@/components/task/task').then((module) => {
    resolve(module)
  })
}
const TaskDetail = (resolve) => {
  import('@/components/task/taskDetail').then((module) => {
    resolve(module)
  })
}
const tryDetail = (resolve) => {
  import('@/components/task/tryDetail').then((module) => {
    resolve(module)
  })
}
const task = [{
  path: 'task',
  component: Task,
  name: 'task'
}, {
  path: 'task/taskDetail',
  component: TaskDetail,
  name: 'taskDetail'
}, {
  path: 'task/tryDetail',
  component: tryDetail,
  name: 'tryDetail'
}]
export default task
