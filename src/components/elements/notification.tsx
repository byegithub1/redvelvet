'use client'

import React from 'react'

import type { NotificationArgsProps } from 'antd'

import { notification } from 'antd'
import { Button, Space } from 'antd'

type Placement = NotificationArgsProps['placement']
type NotificationType = 'success' | 'info' | 'warning' | 'error'

interface NotificationProps {
  name: string
  type: NotificationType
  placement: Placement
  message: string
  description: string
  icon?: React.ReactNode
}

const Notification: React.FC<NotificationProps> = ({ name, type, placement, message, description, icon }) => {
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (type: NotificationType) => {
    api[type]({
      message,
      description,
      placement
    })
  }

  return (
    <>
      {contextHolder}
      <Space>
        <Button className="mt-2" type="default" size="small" onClick={() => openNotification(type)} icon={icon}>
          {name}
        </Button>
      </Space>
    </>
  )
}

export default Notification
