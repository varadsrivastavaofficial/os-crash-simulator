export default function MacOSKernelPanicScreen() {
  const panicText = `panic(cpu 0 caller 0xffffff801a23e25d): "userspace panic: Checkpoint: IOHIDFamily: User mapping initialized. Checkpoint: IOPCIFamily: PCI domain did not grant access to device" @/System/Volumes/Data/SWE/macOS/BuildRoots/.........
Debugger called: <panic>
Backtrace (CPU 0), Frame : Return Address
0xffffff801a23e25d : 0xffffff801a23e25d
0xffffff801b6b5e65 : 0xffffff801b5a5b1b
0xffffff801b6b5eb3 : 0xffffff801b6b554e
0xffffff801b6b5f20 : 0xffffff801b6b5e65
0xffffff801b5f7b4c : 0xffffff801b6b5eb3
0xffffff801b5f7e44 : 0xffffff801b5f7b4c
0xffffff801b802a8f : 0xffffff801b5f7e44
0xffffff801b802a8f : 0xffffff801b802a8f
0xffffff801b802a8f : 0xffffff801b802a8f
0xffffff801a23e25d : 0xffffff801a23e25d
0xffffff801b6b5e65 : 0xffffff801b5a5b1b
0xffffff801b6b5eb3 : 0xffffff801b6b554e
0xffffff801b6b5f20 : 0xffffff801b6b5e65
BSD process name corresponding to current thread: kernel_task

Mac OS version:
23F79

Kernel version:
Darwin Kernel Version 23.5.0: Wed May  1 20:12:58 PDT 2024; root:xnu-10063.121.3~5/RELEASE_ARM64_T8101
Kernel UUID: 7E335D80-A43A-3C67-A295-A4549A33620F
System model name: MacBookPro17,1 (Mac-CFF12E300A2C2A7B)
System uptime in nanoseconds: 1234567890

** In Memory Panic Stackshot Succeeded ** Bytes Traced 123456 **
`;

  return (
    <div className="h-screen w-screen overflow-hidden bg-black p-4 text-white font-code">
      <pre className="whitespace-pre-wrap text-xs leading-tight">
        {panicText.repeat(20)}
      </pre>
    </div>
  );
}
