"use client";

import React, { useEffect, useRef } from 'react';

interface JitsiMeetProps {
    roomName: string;
    userName: string;
    audioOnly?: boolean;
}

export const JitsiMeet = ({ roomName, userName, audioOnly = true }: JitsiMeetProps) => {
    const jitsiRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const domain = 'meet.jit.si';
        const options = {
            roomName: `RuralReach_${roomName}`,
            width: '100%',
            height: '100%',
            parentNode: jitsiRef.current,
            userInfo: { displayName: userName },
            configOverwrite: {
                startWithAudioMuted: false,
                startWithVideoMuted: audioOnly,
                prejoinPageEnabled: false,
                toolbarButtons: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fshangup', 'hangup', 'chat', 'raisehand',
                    'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                    'security'
                ],
            },
            interfaceConfigOverwrite: {
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
            },
        };

        // Load Jitsi script dynamicallly
        const script = document.createElement('script');
        script.src = `https://${domain}/external_api.js`;
        script.async = true;
        script.onload = () => {
            // @ts-ignore
            new window.JitsiMeetExternalAPI(domain, options);
        };
        document.body.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            if (jitsiRef.current) {
                jitsiRef.current.innerHTML = '';
            }
        };
    }, [roomName, userName, audioOnly]);

    return <div ref={jitsiRef} className="w-full h-full bg-black rounded-2xl overflow-hidden shadow-2xl" />;
};
