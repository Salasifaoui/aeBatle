import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";

export default function Screen() {
  

 return (
  <Box className="flex-1 items-center justify-center">
    <Spinner color="primary" size="large" />
    </Box>
  )
}