import styled from '@emotion/styled';

export const AdminGnb = styled.ul`
  padding: 0;
  height: calc(100% - 140px);
  overflow-y: auto;
  opacity: 1;
  transition: all 0.3s;

  li p {
    opacity: 0.8;
  }

  &.active {
    background: #e9e9e9;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
  }
`;

export const AdminLeftMenu = styled.div`
  visibility: visible;
  transition: all 0.5s;
  opacity: 1;
  width: 280px;
  height: calc(100% - 35px);
  background: var(--lp);
  position: relative;
  background-size: cover;
  z-index: 99999;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  box-shadow: 0 3px 5px rgba(173, 197, 218, 0.8);
  transition: all 0.5s;

  p.admin_main_menu {
    font-size: 14px;
    transition: all 0.3s;
    color: #333;
    opacity: 0.6;
    font-weight: 600;
    padding: 12px 10px 12px 15px;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  ${AdminGnb} .active {
    background: #e9e9e9;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
  }

  .active p.admin_main_menu {
    opacity: 1;
    padding: 15px 10px 10px 15px;
  }

  p.admin_main_menu i {
    margin-right: 8px;
    color: #333;
    font-size: 1.2em;
  }

  .fa.fa-user {
    display: none;
  }

  .admin_sub_menu {
    margin-left: 25px;
    padding: 0px 0 10px;
    width: calc(100% - 25px);
    display: none;

    li a::before {
      content: '-';
      margin-right: 5px;
      display: inline-block;
    }

    li a {
      font-size: 13px;
      padding: 3px 0;
      box-sizing: border-box;
      display: inline-block;
      width: 100%;
      color: #333;
    }

    li:last-child {
      border-bottom: none;
    }

    li:last-child a {
      border: none;
    }
  }

  p.admin_main_menu:hover {
  }

  .admin_sub_menu li a:hover {
    color: var(--red);
  }

  .admin_sub_menu li a.actived,
  .admin_sub_menu li a.actived:hover {
    font-weight: 500;
    color: var(--red);
  }

  p.admin_main_menu.actived {
    color: #51caf5;
  }
`;

export const AdminTitle = styled.p`
  width: 100%;
  height: 100px;
  background: url(/resources/Images/logo.svg) 50% 50% no-repeat;
  text-indent: -5000px;
  background-size: 60%;
  opacity: 1;
  transition: all 0.3s;

  span {
    font-size: 23px;
    text-transform: uppercase;
  }
`;

export const AdminFooter = styled.p`
  width: 280px;
  position: absolute;
  bottom: 10px;
  left: 0;
  text-align: center;
  font-size: 11px;
  opacity: 0.6;
`;
