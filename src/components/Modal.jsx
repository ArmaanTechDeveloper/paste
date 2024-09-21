import { modal as modalAtom } from '../atoms'
import { useRecoilState } from 'recoil'

const Modal = ({ children }) => {
  const [modal , setModal] = useRecoilState(modalAtom)
  const toggleModal = () => {
    setModal(!modal)
  }
  return (
    <div className='modal'>
      <div>
        <div className="close-btn">
          <button onClick={toggleModal}>close</button>
        </div>
        
        {children}
      </div>
    </div>
  )
}

export default Modal