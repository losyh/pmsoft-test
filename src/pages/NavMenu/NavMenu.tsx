
import { Flex } from 'antd';
import { Link } from 'react-router-dom';


const NavMenu: React.FC = () => {

  return (
   <Flex vertical>
        <Link style={{color: 'white'}} to='/all-boocks'>All Books</Link>
   </Flex>
  );
};


export default NavMenu
