
import { Modal } from '@mui/material';
import ModalIcon from '../assets/unsuccess.png';
import SuccessModalIcon from '../assets/successReceipt.png';


export function ErrorDialogComp ({content, contentKeyword, title, commands, type, openModal, setOpenModal}){
    
   
    
    return <Modal open={openModal} onClose={()=>setOpenModal(false)}>
    <div style={{
        height:'100%',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }}>
        <div style={{
            backgroundColor:'white',
            width:'350px',
            height:'220px',
            borderRadius:15,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'space-between'
        }}>
            <div className='modal-icon-container' style={{
                position:'relative',
                padding:15,
                }}>
                {type === 'warning'? <img src={ModalIcon} height={35} width={35} alt=''/>: 
                <img src={SuccessModalIcon} height={35} width={35} alt=''/>}
            </div>
            
            <div className='modal-content-container' style={{
                display:"flex",
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                columnGap:15
            }}>
                <h3>{title}</h3>
                <p style={{
                    textAlign:'center',
                    marginLeft:15,
                    marginRight:15
                }}>
                   {content} <b>{contentKeyword}</b>
                </p>
            </div>
            <div className='modal-action-button-container' style={{
                display:'flex',
                justifyContent:'space-evenly',
                width:'100%',
                height:60,
                alignItems:'center',
                fontWeight:900
                }}>
               
                {commands.map((value)=><div className='modal-action-button' key={value}>
                    <p style={{color:'black'}} onClick={()=>setOpenModal(false)}>{value}</p>
                </div>)}
            </div>

        </div>
    </div>
        
    </Modal>
}