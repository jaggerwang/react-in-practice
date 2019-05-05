import { message, notification } from 'antd'

export function showMessage(content, { type = 'error', duration, onClose, icon } = {}) {
  return message.open({ content, type, duration, onClose, icon })
}

export function showNotification(message, description, { type = 'info', duration,
  onClose, icon, btn, className, key, placement, style, onClick } = {}) {
  return notification.open({
    message, description, type, duration, onClose, icon, btn, className, key,
    placement, style, onClick
  })
}