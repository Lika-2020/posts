import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsChat } from 'react-icons/bs';
import { Card, Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { selectUser } from '../../store/slice/usersSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchComments } from '../../store/slice/commentsSlice';

function UserInfo() {
  const [isLoading, setIsLoading] = useState(true);
  const selectedUserId = useSelector((state) => state.users.selectedUserId);
  const selectedUser = useSelector((state) =>
    state.users.user.find((user) => user.id === selectedUserId)
  );
  const selectedUserPosts = useSelector((state) =>
    state.posts.posts.filter((post) => post.userId === selectedUserId)
  );

  const { commentsByPostId, error: commentsError } = useSelector(
    (state) => state.comments
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          const storedData = localStorage.getItem('users');
          const parsedData = storedData ? JSON.parse(storedData) : {};
          const storedSelectedUserId = parsedData.selectedUserId;
          if (storedSelectedUserId) {
            dispatch(selectUser(parseInt(storedSelectedUserId, 10)));
          }
          setIsLoading(false);
          resolve(); // Разрешить промис после завершения операций
        }, 500);
      });
    };

    fetchData();
  }, [dispatch]);
  const [showComments, setShowComments] = useState({});

  const handleCommentClick = async (postId) => {
    if (showComments[postId]) {
      setShowComments((prevState) => ({
        ...prevState,
        [postId]: false,
      }));
    } else {
      if (
        !commentsByPostId[postId] &&
        selectedUserPosts.some((post) => post.id === postId)
      ) {
        await dispatch(fetchComments(postId));
      }
      setShowComments((prevState) => ({
        ...prevState,
        [postId]: true,
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="text-center" style={{marginTop: '500px'}}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!selectedUserId || !selectedUser) {
    return <div>No user selected</div>; // Отобразить сообщение о не выбранном пользователе
  }
  if (commentsError) {
    return <div>Error: {commentsError}</div>;
  }

  return (
    <Container>
      
      <Row className="justify-content-center">
        <div style={{paddingBottom: '10px', marginTop:'100px'}}>
      <Link style={{ fontSize: '20px', textDecoration: 'none', marginLeft:'60px'}} to="/">Назад</Link>
      
      </div>
        <div style={{ marginLeft: '50px', marginTop: '50px' }}>
          <h2 className="fs-sm-3 fs-md-2 fs-lg-1" style={{ fontFamily: 'Roboto', color: '#104881' }}>
            {selectedUser.name}
          </h2>
          <p className="fs-sm-3 fs-md-2 fs-lg-1"
            style={{
              fontSize: '18px',
              color: '#0955a1bc',
              fontFamily: 'Roboto',
              marginTop: '30px'
            }}
          >
            Username: {selectedUser.username}
          </p>
          <p className="fs-sm-3 fs-md-2 fs-lg-1"
            style={{
              fontSize: '18px',
              color: '#0955a1bc',
              fontFamily: 'Roboto',
            }}
          >
            Email: {selectedUser.email}
          </p>
        </div>
        {selectedUserPosts.length > 0 ? (
          <div>
            {selectedUserPosts.map((post) => (
              <div key={post.id}>
                <Card
                  style={{
                    borderRadius: '36px',
                    marginTop: '40px',
                    padding: '20px',
                    marginLeft: '30px',
                  }}
                >
                  <h4 className="fs-sm-3 fs-md-2 fs-lg-1"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'Roboto',
                      color: '#104881',
                    }}
                  >
                    {post.title}
                  </h4>
                  <p className="fs-sm-3 fs-md-2 fs-lg-1"
                    style={{
                      fontSize: '16px',
                      color: '#0955a1bc',
                      fontFamily: 'Roboto',
                    }}
                  >
                    {post.body}
                  </p>
                </Card>
                <div style={{ marginLeft: '50px' }}>
                  <BsChat
                    size={30}
                    style={{
                      cursor: 'pointer',
                      marginTop: '20px',
                      marginBottom: '50px',
                      color: '#0955a1bc',
                    }}
                    onClick={() =>
                      post && post.id && handleCommentClick(post.id)
                    }
                  />
                  {showComments[post.id] && (
                    <div>
                      {commentsByPostId[post.id]?.map((comment) => (
                        <div key={comment.id}>
                          <p className="fs-sm-3 fs-md-2 fs-lg-1"
                            style={{
                              fontSize: '18px',
                              color: '#104881',
                              fontFamily: 'Roboto',
                            }}
                          >
                            {comment.email}
                          </p>
                          <p className="fs-sm-3 fs-md-2 fs-lg-1"
                            style={{
                              fontSize: '16px',
                              paddingBottom: '20px',
                              fontFamily: 'Roboto',
                              color: '#0955a1bc',
                            }}
                          >
                            {comment.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available</p>
        )}
        <Link style={{paddingBottom: '100px', fontSize: '20px', textDecoration: 'none', marginLeft:'60px'}} to="/">Назад</Link>
      </Row>
    </Container>
  );
}

export default UserInfo;
