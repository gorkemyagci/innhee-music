import Modal from "@/modules/settings-modal/ui/views/modal";

const SettingsModal = ({ children, open = false, setOpen = () => { } }: {
    children?: React.ReactNode;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}) => {
    return <Modal open={open} setOpen={setOpen}>
        {children}
    </Modal>
}

export default SettingsModal;