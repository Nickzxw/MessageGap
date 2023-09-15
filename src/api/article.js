import request from '@/utils/request'
// 获取信息分类
export const artGetChannelService = () => request.get('my/cate/list')
// 添加信息分类
export const artAddChannelService = (data) => request.post('my/cate/add', data)
// 编辑信息分类
export const artEditChannelService = (data) => request.put('my/cate/info', data)
// 删除信息分类
export const artDelChannelService = (id) =>
  request.delete('my/cate/del', { params: { id } })
// 获取文章列表
export const artGetListService = (params) =>
  request.get('my/article/list', { params })
// 添加文章
export const artPublishService = (data) => {
  request.post('my/article/add', data)
}
// 获取文章详情
export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })
