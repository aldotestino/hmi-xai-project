import { Separator } from './ui/separator';

function SidebarHeader() {
  return (
    <div>
      <h1 className="p-4 text-3xl font-semibold">Diabetes</h1>
      <Separator />
      <p className='p-4 text-lg font-semibold text-muted-foreground'>Features</p>
    </div>
  );
}

export default SidebarHeader;