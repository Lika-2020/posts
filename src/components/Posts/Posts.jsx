import { useSelector, useDispatch } from 'react-redux';
import './Posts.css';
import { useEffect, useState } from 'react';
import { BsChat } from 'react-icons/bs';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Container } from 'react-bootstrap';
import avatar from '../../img/avatar.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchPosts } from '../../store/slice/postsSlice';
import { fetchComments } from '../../store/slice/commentsSlice';
import { fetchUsers, selectUser } from '../../store/slice/usersSlice';


function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state) => state.posts);

  const { commentsByPostId, error: commentsError } = useSelector(
    (state) => state.comments
  );
  const { user } = useSelector((state) => state.users);

  const [selectedUserId, setSelectedUserId] = useState(null);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Количество элементов на странице

  const [showComments, setShowComments] = useState({});

  const handleCommentClick = async (postId) => {
    if (showComments[postId]) {
      setShowComments((prevState) => ({
        ...prevState,
        [postId]: false,
      }));
    } else {
      if (!commentsByPostId[postId]) {
        await dispatch(fetchComments(postId));
      }
      setShowComments((prevState) => ({
        ...prevState,
        [postId]: true,
      }));
    }
  };

  if (commentsError) {
    return <div>Error: {commentsError}</div>;
  }

  const handleAvatarClick = (userId) => {
    setSelectedUserId(userId);
    localStorage.setItem('users', JSON.stringify({ selectedUserId: userId }));
    navigate('/user-info');
    console.log('click');
  };

  useEffect(() => {
    const loadUser = async (userId) => {
      await dispatch(fetchUsers(userId));
    };

    posts.forEach((post) => {
      loadUser(post.userId);
    });

    if (selectedUserId) {
      dispatch(selectUser(selectedUserId));
    }
  }, [dispatch, posts, selectedUserId]);

  const getUserById = (targetUserId) =>
    user.find((us) => us.id === targetUserId);

  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: '500px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Пагинация

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const maxVisiblePages = 5; // Количество видимых страниц пагинации одновременно

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const getPageNumbersToDisplay = () => {
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    const firstVisiblePage = Math.max(currentPage - halfMaxVisiblePages, 1);
    const lastVisiblePage = Math.min(
      firstVisiblePage + maxVisiblePages - 1,
      totalPages
    );

    return Array.from(
      { length: lastVisiblePage - firstVisiblePage + 1 },
      (_, i) => firstVisiblePage + i
    );
  };

  const pageNumbersToDisplay = getPageNumbersToDisplay();
  console.log(user);
  return (
    <Row>
      {posts
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((post) => (
          <div key={post.id}>
         
              {user.length > 0 && (
                <div className="user-info">
                  <img
                    role="presentation"
                    onClick={() => handleAvatarClick(post.userId)}
                    src={avatar}
                    alt="аватар"
                    style={{ cursor: 'pointer' }}
                    className="responsive-image"
                  />
                  <div className='user-name'>
                    <Card style={{ border: 'none'}} className='userName-info'>
                    <p className="fs-sm-3 fs-md-2 fs-lg-1">
                      {getUserById(post.userId)?.name}
                    </p>
                    <p className="fs-sm-3 fs-md-2 fs-lg-1">
                      {getUserById(post.userId)?.email}
                    </p>
                    <p className="fs-sm-3 fs-md-2 fs-lg-1">
                      {getUserById(post.userId)?.phone}
                    </p>
                    </Card>
                  </div>

                </div>
              )}
    

            <Card.Body>
              <Card className='whd'
                style={{
                  borderRadius: '36px',
                  marginTop: '40px',
                  padding: '10px',
                  marginLeft: '30px',
                  marginRight: '30px',
                }}
              >
                <Card.Title
                  style={{
                    padding: '10px',
                    fontFamily: 'Roboto',
                    color: '#104881',
                  }}
                  className="my-4 fs-sm-3 fs-md-2 fs-lg-1"
                >
                  {post.title}
                </Card.Title>
                <Card.Text
                  style={{
                    padding: '10px',
                    color: '#0955a1bc',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                  }}
                  className="fs-sm-3 fs-md-2 fs-lg-1"
                >
                  {post.body}
                </Card.Text>
              </Card>
              <div style={{ paddingBottom: '70px', marginLeft: '40px' }}>
                <BsChat
                  size={30}
                  style={{
                    cursor: 'pointer',
                    marginTop: '20px',
                    marginBottom: '50px',
                    color: '#0955a1bc',
                  }}
                  onClick={() => handleCommentClick(post.id)}
                />

                {showComments[post.id] && (
                  <Container>
                    {commentsByPostId[post.id]?.map((comment) => (
                      <div key={comment.id}>
                        <h5
                          style={{
                            fontSize: '18px',
                            color: '#104881',
                            fontFamily: 'Roboto',
                          }}
                          className="fs-sm-3 fs-md-2 fs-lg-1"
                        >
                          {comment.email}
                        </h5>
                        <p
                          style={{
                            fontSize: '16px',
                            paddingBottom: '20px',
                            fontFamily: 'Roboto',
                            color: '#0955a1bc',
                          }}
                          className="fs-sm-3 fs-md-2 fs-lg-1"
                        >
                          {comment.body}
                        </p>
                      </div>
                    ))}
                  </Container>
                )}
              </div>
            </Card.Body>
          </div>
        ))}

      <Pagination
        className="pagination"
        style={{ marginTop: '50px' }}
        size="sm"
      >
        <Pagination.First onClick={() => handlePaginationClick(1)} />
        <Pagination.Prev
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        />

        {pageNumbersToDisplay.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePaginationClick(number)}
            style={{ margin: '0 5px' }}
          >
            {number}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => handlePaginationClick(totalPages)} />
      </Pagination>
    </Row>
  );
}

export default Posts;
