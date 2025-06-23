import { Menu, Indicator, Notification } from '@mantine/core';
import { IconBell, IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getNotifications, readNotification } from '../Services/NotifyService';
import { useNavigate } from 'react-router-dom';

interface RootState {
  user: {
    id: string;
  };
}

interface NotificationType {
  id: string;
  action: string;
  message: string;
  route: string;
}

const NotificationMenu = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const removeNotification = (index: number) => {
    const selectedNotification = notifications[index];
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);

    readNotification(selectedNotification.id)
      .then(() => {
        if (user?.id) {
          getNotifications(user.id)
            .then((res) => setNotifications(res))
            .catch((err) => {
              console.error('Failed to fetch notifications:', err);
              setError('Failed to load notifications');
            });
        }
      })
      .catch((err) => {
        console.error('Failed to read notification:', err);
      });
  };

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      setError(null);
      getNotifications(user.id)
        .then((res) => setNotifications(res))
        .catch((err) => {
          console.error('Failed to fetch notifications:', err);
          setError('Failed to load notifications');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div>
      <Menu shadow="md" width={300} opened={opened} onChange={setOpened}>
        <Menu.Target>
          <div className="bg-mine-shaft-900 p-1.5 rounded-full">
            <Indicator
              disabled={notifications.length <= 0}
              color="brightSun.4"
              size={8}
              offset={6}
              processing={loading}
            >
              <IconBell stroke={1.5} className="h-5 w-5 md:h-6 md:w-6" />
            </Indicator>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <div className="flex flex-col gap-1 max-w-[300px]">
            {loading ? (
              <div className="p-3 text-center">Loading...</div>
            ) : error ? (
              <div className="p-3 text-center text-red-500">{error}</div>
            ) : notifications.length === 0 ? (
              <div className="p-3 text-center text-gray-500">No notifications</div>
            ) : (
              notifications.map((notification, index) => (
                <Notification
                  key={notification.id}
                  onClick={() => {
                    navigate(notification.route);
                    removeNotification(index);
                    setOpened(false);
                  }}
                  className="hover:bg-mine-shaft-900 cursor-pointer"
                  icon={
                    <IconCheck
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(index);
                      }}
                      style={{ width: 20, height: 20, display: 'block' }}
                    />
                  }
                  color="teal"
                  title={notification.action}
                  withCloseButton
                  onClose={() => removeNotification(index)}
                >
                  {notification.message}
                </Notification>
              ))
            )}
          </div>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default NotificationMenu;
